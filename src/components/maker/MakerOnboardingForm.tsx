import { useState, useEffect } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { ChevronRight, CheckCircle2, UploadCloud, Loader2, Check, X, FileText, } from 'lucide-react'
import { genUploader } from 'uploadthing/client'
import type { OurFileRouter } from '#/lib/uploadthing'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { Input } from '../ui/input'
import { toast } from '#/components/ui/toast'
import { compressFileIfNeeded } from '#/utils/file-compression'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { submitVerification } from './actions'

const { uploadFiles } = genUploader<OurFileRouter>({
  url: "/api/uploadthing",
});

export function MakerOnboardingForm({ step: propStep = 0, setStep: propSetStep }: { step?: number, setStep?: (s: number) => void } = {}) {
  const router = useRouter();
  const [internalStep, setInternalStep] = useState(0);
  const step = propSetStep ? propStep : internalStep;

  const setStep = (newStep: number | ((s: number) => number)) => {
    const next = typeof newStep === 'function' ? newStep(step) : newStep;
    if (propSetStep) propSetStep(next);
    else setInternalStep(next);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsNextLoading(false);
    setIsBackLoading(false);
  }, [step]);

  const [formData, setFormData] = useState(() => {
    let saved = null;
    if (typeof window !== 'undefined') {
      try {
        saved = JSON.parse(sessionStorage.getItem('makerOnboardingFormData') || 'null');
      } catch (e) { }
    }
    return {
      firstName: saved?.firstName || '',
      lastName: saved?.lastName || '',
      dobDay: saved?.dobDay || '',
      dobMonth: saved?.dobMonth || '',
      dobYear: saved?.dobYear || '',
      specialization: saved?.specialization || '',
      registrationNumber: saved?.registrationNumber || '',
      degreeFile: null as File | null,
      registrationFile: null as File | null,
      idProofType: saved?.idProofType || 'aadhaar',
      idProofFile: null as File | null,
      profilePhoto: null as File | null,
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { degreeFile, registrationFile, idProofFile, profilePhoto, ...rest } = formData;
      sessionStorage.setItem('makerOnboardingFormData', JSON.stringify(rest));
    }
  }, [formData]);

  const handleNext = () => {
    const newErrors: Record<string, boolean> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = true;
      if (!formData.lastName) newErrors.lastName = true;
      if (!formData.dobDay) newErrors.dobDay = true;
      if (!formData.dobMonth) newErrors.dobMonth = true;
      if (!formData.dobYear) newErrors.dobYear = true;
      if (!formData.specialization) newErrors.specialization = true;
    } else if (step === 2) {
      if (!formData.registrationNumber) newErrors.registrationNumber = true;
      if (!formData.degreeFile) newErrors.degreeFile = true;
      if (!formData.registrationFile) newErrors.registrationFile = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.add({ type: 'error', title: 'Validation Error', description: 'Please fill in all required fields.' });
      return;
    }

    setErrors({});
    setIsNextLoading(true);
    setStep(s => s + 1);
  };
  const handleBack = () => {
    setIsBackLoading(true);
    setStep(s => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    if (!formData.idProofType) newErrors.idProofType = true;
    if (!formData.idProofFile) newErrors.idProofFile = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.add({ type: 'error', title: 'Validation Error', description: 'Please fill in all required fields.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const files = [
        { file: formData.degreeFile, key: 'degreeFileUrl' },
        { file: formData.registrationFile, key: 'registrationFileUrl' },
        { file: formData.idProofFile, key: 'idProofFileUrl' },
        { file: formData.profilePhoto, key: 'profilePhotoUrl' }
      ];

      const uploadedUrls: Record<string, string> = {};

      await Promise.all(files.map(async ({ file, key }) => {
        if (file) {
          const res = await uploadFiles("mediaUploader", {
            files: [file]
          });
          if (res.length > 0) {
            uploadedUrls[key] = res[0].url;
          }
        }
      }));

      if (!uploadedUrls.degreeFileUrl || !uploadedUrls.registrationFileUrl || !uploadedUrls.idProofFileUrl) {
        throw new Error("Missing file uploads");
      }

      await submitVerification({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: new Date(`${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`),
          specialization: formData.specialization,
          registrationNumber: formData.registrationNumber,
          degreeFileUrl: uploadedUrls.degreeFileUrl,
          registrationFileUrl: uploadedUrls.registrationFileUrl,
          idProofType: formData.idProofType,
          idProofFileUrl: uploadedUrls.idProofFileUrl,
          profilePhotoUrl: uploadedUrls.profilePhotoUrl,
        }
      });

      setStep(4);
      router.invalidate();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const processFilePromise = async () => {
        const processedFile = await compressFileIfNeeded(file, 3);
        setFormData(prev => ({ ...prev, [field]: processedFile }));
        return processedFile;
      };

      toast.promise(processFilePromise(), {
        loading: { title: 'Processing file...', description: 'Compressing image if needed.' },
        success: { title: 'File ready', description: 'File processed successfully.' },
        error: (err: any) => ({ title: 'File Error', description: err.message }),
      }).catch(() => {
        e.target.value = '';
      });
    }
  };

  const removeFile = (field: keyof typeof formData) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  return (
    <div className="w-full h-full flex flex-col max-w-md mx-auto justify-center relative">
      {step === 0 && (
        <div className="flex flex-col h-full text-center">
          <div className="mb-8">
            <h1 className="text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Verify Your Researcher Account
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Please complete verification to access specialized tools.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center mb-4 text-left">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
              Verification is required to ensure the integrity of our platform. By confirming your professional identity, you gain authorization to add and manage clinical trial medications securely within the system.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Clinical Trial Medications</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Authorized access to add, update, and manage clinical trial meds within the platform.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Advanced Analytics Tools</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Unlock specialized dashboard views, deep research insights, and data exports.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Verified Researcher Badge</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Display a verified badge on your profile to build trust and credibility in the community.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
              <button onClick={handleNext} disabled={isNextLoading} className="flex-1 p-3.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-500 transition-all shadow-md shadow-blue-900/20 flex items-center justify-center group cursor-pointer disabled:opacity-70">
                {isNextLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Start Now</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              <Link to="/" className="flex-1 p-3.5 bg-zinc-100 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded-full text-center hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all">
                Do it later
              </Link>
            </div>
          </div>
        </div>
      )}

      {step > 0 && step < 4 && (
        <>
          <div className="hidden lg:flex flex-col absolute top-1/2 -translate-y-1/2 left-[calc(100%+5rem)] w-64 pointer-events-none">
            {[
              { id: 1, title: 'Personal Information', desc: 'Basic details' },
              { id: 2, title: 'Professional Credentials', desc: 'Verification docs' },
              { id: 3, title: 'Final Submission', desc: 'ID Proof & Finish' },
            ].map((s) => (
              <div key={s.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors relative z-10 ${step > s.id ? 'bg-blue-600 border-blue-600 text-white' :
                    step === s.id ? 'border-blue-500 text-blue-500 bg-zinc-50 dark:bg-zinc-950' :
                      'border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-950'
                    }`}>
                    {step > s.id ? <Check className="w-4 h-4" /> : <span className="text-sm font-medium">{s.id}</span>}
                  </div>
                  {s.id !== 3 && (
                    <div className={`w-0.5 h-12 my-1 transition-colors ${step > s.id ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                  )}
                </div>
                <div className="pt-1">
                  <h4 className={`text-sm font-medium ${step === s.id ? 'text-blue-600 dark:text-blue-500' : step > s.id ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-600'}`}>{s.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col h-full w-full">
            <div className="mb-8 mt-6">
              <h1 className="text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {step === 1 && "Personal Information"}
                {step === 2 && "Professional Credentials"}
                {step === 3 && "Final Submission"}
              </h1>
            </div>

            <form noValidate onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="flex-1 flex flex-col">
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center overflow-hidden group cursor-pointer transition-colors shadow-sm">
                      <input type="file" onChange={handleFileChange('profilePhoto')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                      {formData.profilePhoto ? (
                        <>
                          <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-medium">Change</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-zinc-400 group-hover:text-blue-500 transition-colors">
                          <UploadCloud className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-medium">Add Photo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">First Name</label>
                      <Input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. Addy" className={`rounded-full ${errors.firstName ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : ''}`} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Last Name</label>
                      <Input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Raj" className={`rounded-full ${errors.lastName ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : ''}`} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Date of Birth</label>
                    <div className="flex items-center gap-2">
                      <Input required type="text" maxLength={2} name="dobDay" value={formData.dobDay} onChange={handleChange} className={`w-16 p-3 bg-zinc-50 dark:bg-zinc-900 border ${errors.dobDay ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center`} placeholder="DD" />
                      <span className="text-zinc-400">/</span>
                      <Input required type="text" maxLength={2} name="dobMonth" value={formData.dobMonth} onChange={handleChange} className={`w-16 p-3 bg-zinc-50 dark:bg-zinc-900 border ${errors.dobMonth ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center`} placeholder="MM" />
                      <span className="text-zinc-400">/</span>
                      <Input required type="text" maxLength={4} name="dobYear" value={formData.dobYear} onChange={handleChange} className={`w-24 p-3 bg-zinc-50 dark:bg-zinc-900 border ${errors.dobYear ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center`} placeholder="YYYY" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Specialization</label>
                    <NativeSelect required name="specialization" value={formData.specialization} onChange={handleChange} className={`w-full ${errors.specialization ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500 rounded-full' : ''}`}>
                      <NativeSelectOption value="" disabled>Select Specialization</NativeSelectOption>
                      <NativeSelectOption value="Ayurveda">Ayurveda</NativeSelectOption>
                      <NativeSelectOption value="Homeopathy">Homeopathy</NativeSelectOption>
                      <NativeSelectOption value="Unani">Unani</NativeSelectOption>
                      <NativeSelectOption value="Cardiology">Cardiology</NativeSelectOption>
                      <NativeSelectOption value="Neurology">Neurology</NativeSelectOption>
                      <NativeSelectOption value="Other">Other</NativeSelectOption>
                    </NativeSelect>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 -mt-8">
                      Secure verification ensures only qualified practitioners contribute.
                    </p>
                  </div>
                  <div>
                    <div className="mb-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Registration Number</label>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Your official state or central medical council registration number.</p>
                    </div>
                    <Input required type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className={`w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border ${errors.registrationNumber ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50`} placeholder="Medical Council Reg No." />
                  </div>
                  <div>
                    <div className="mb-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Professional Degree</label>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Upload a scan of your primary medical degree (e.g., BAMS, MD).</p>
                    </div>
                    {!formData.degreeFile ? (
                      <div className={`relative border-2 border-dashed ${errors.degreeFile ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl p-3 text-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors`}>
                        <input required type="file" onChange={handleFileChange('degreeFile')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                        <UploadCloud className={`w-5 h-5 mx-auto mb-1.5 ${errors.degreeFile ? 'text-red-400' : 'text-zinc-400'}`} />
                        <span className={`text-xs ${errors.degreeFile ? 'text-red-500' : 'text-zinc-500'}`}>Upload Certificate (PDF/Image)</span>
                      </div>
                    ) : (
                      <div className="relative w-24 h-24 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group shadow-sm bg-zinc-50 dark:bg-zinc-900">
                        {formData.degreeFile.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(formData.degreeFile)} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2">
                            <FileText className="w-8 h-8 text-zinc-400 mb-2" />
                            <span className="text-[10px] text-zinc-500 font-medium text-center line-clamp-2">{formData.degreeFile.name}</span>
                          </div>
                        )}
                        <button type="button" onClick={removeFile('degreeFile')} className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Medical Council Registration</label>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Upload your valid medical registration certificate.</p>
                    </div>
                    {!formData.registrationFile ? (
                      <div className={`relative border-2 border-dashed ${errors.registrationFile ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl p-3 text-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors`}>
                        <input required type="file" onChange={handleFileChange('registrationFile')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                        <UploadCloud className={`w-5 h-5 mx-auto mb-1.5 ${errors.registrationFile ? 'text-red-400' : 'text-zinc-400'}`} />
                        <span className={`text-xs ${errors.registrationFile ? 'text-red-500' : 'text-zinc-500'}`}>Upload Registration (PDF/Image)</span>
                      </div>
                    ) : (
                      <div className="relative w-24 h-24 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group shadow-sm bg-zinc-50 dark:bg-zinc-900">
                        {formData.registrationFile.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(formData.registrationFile)} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2">
                            <FileText className="w-8 h-8 text-zinc-400 mb-2" />
                            <span className="text-[10px] text-zinc-500 font-medium text-center line-clamp-2">{formData.registrationFile.name}</span>
                          </div>
                        )}
                        <button type="button" onClick={removeFile('registrationFile')} className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">ID Proof Type</label>
                    <NativeSelect name="idProofType" value={formData.idProofType} onChange={handleChange} className={`w-full ${errors.idProofType ? 'border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500 rounded-full' : ''}`}>
                      <NativeSelectOption value="aadhaar">Aadhaar Card</NativeSelectOption>
                      <NativeSelectOption value="pan">PAN Card</NativeSelectOption>
                      <NativeSelectOption value="passport">Passport</NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Upload Government ID</label>
                    {!formData.idProofFile ? (
                      <div className={`relative border-2 border-dashed ${errors.idProofFile ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl p-4 text-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors`}>
                        <input required type="file" onChange={handleFileChange('idProofFile')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                        <UploadCloud className={`w-6 h-6 mx-auto mb-2 ${errors.idProofFile ? 'text-red-400' : 'text-zinc-400'}`} />
                        <span className={`text-xs ${errors.idProofFile ? 'text-red-500' : 'text-zinc-500'}`}>Scan/PDF of official ID</span>
                      </div>
                    ) : (
                      <div className="relative w-28 h-28 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group shadow-sm bg-zinc-50 dark:bg-zinc-900">
                        {formData.idProofFile.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(formData.idProofFile)} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2">
                            <FileText className="w-8 h-8 text-zinc-400 mb-2" />
                            <span className="text-[10px] text-zinc-500 font-medium text-center line-clamp-2">{formData.idProofFile.name}</span>
                          </div>
                        )}
                        <button type="button" onClick={removeFile('idProofFile')} className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-full text-[10px] text-blue-700 dark:text-blue-200 border border-blue-100 dark:border-blue-700 mt-4 flex items-center justify-center gap-2">
                    By submitting, you confirm that all provided information is accurate and matches your official documentation.
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 flex gap-3">
                <button type="button" onClick={handleBack} disabled={isBackLoading || isNextLoading || isSubmitting} className="w-1/3 p-3.5 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center disabled:opacity-70">
                  {isBackLoading ? <Loader2 className="w-5 h-5 animate-spin text-zinc-500" /> : 'Back'}
                </button>
                <button type="submit" disabled={isSubmitting || isNextLoading} className="flex-1 p-3.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-500 transition-all shadow-md shadow-blue-900/20 flex items-center justify-center disabled:opacity-70">
                  {isSubmitting || (isNextLoading && step !== 3) ? <Loader2 className="w-5 h-5 animate-spin" /> : (step === 3 ? 'Submit Application' : 'Continue')}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in zoom-in duration-500">
          <div className="w-64 h-64 mb-6">
            <DotLottieReact src="/animations/verify.lottie" autoplay loop />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Document Under Review</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
            We have received your documents and they are currently being reviewed by our team. This process usually takes 24-48 hours. We'll notify you once your account is verified.
          </p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-500 transition-colors shadow-md shadow-blue-900/20">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  )
}
