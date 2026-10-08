import { createFileRoute } from "@tanstack/react-router";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "../../lib/uploadthing";

const handlers = createRouteHandler({ router: uploadRouter });

export const Route = createFileRoute("/api/uploadthing")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return handlers(request);
      },
      POST: async ({ request }) => {
        return handlers(request);
      },
    },
  },
});
