import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as msgService from "./services/msgService.js"

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response("", {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const sendMessage = async (request) => {
  const formdata = await request.formData();
  const sender = formdata.get("sender");
  const msg = formdata.get("message");
  await msgService.sendMsg(sender, msg);

  return redirectTo("/");
};

const handleRequest = async (request) => {
  const data = {
    messages: await msgService.findLastFive(),
  };

  if(request.method === "POST") {
    return await sendMessage(request);
  }

  return new Response(await renderFile("index.eta", data), responseDetails);
};

serve(handleRequest, { port: 7777 });

