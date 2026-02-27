import type { SlackCommandContext } from "../types";

export async function registerStandupCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "submit":
      return await handleStandupSubmit(context);
    default:
      return await handleStandupSubmit(context);
  }
}

async function handleStandupSubmit(context: SlackCommandContext) {
  await context.client.views.open({
    trigger_id: (context.body as { trigger_id: string }).trigger_id,
    view: {
      type: "modal",
      callback_id: "standup_submit_modal",
      title: { type: "plain_text", text: "Daily Standup" },
      submit: { type: "plain_text", text: "Submit" },
      close: { type: "plain_text", text: "Cancel" },
      blocks: [
        {
          type: "input",
          block_id: "project",
          label: { type: "plain_text", text: "Project" },
          element: {
            type: "static_select",
            action_id: "project_select",
            options: [
              { text: { type: "plain_text", text: "Client Portal v2" }, value: "proj-1" },
              { text: { type: "plain_text", text: "Mobile Banking App" }, value: "proj-2" },
              { text: { type: "plain_text", text: "AI Dashboard" }, value: "proj-3" },
            ],
          },
        },
        {
          type: "input",
          block_id: "yesterday",
          label: { type: "plain_text", text: "What did you accomplish yesterday?" },
          element: {
            type: "plain_text_input",
            action_id: "yesterday_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "Describe what you completed yesterday...",
            },
          },
        },
        {
          type: "input",
          block_id: "today",
          label: { type: "plain_text", text: "What are you working on today?" },
          element: {
            type: "plain_text_input",
            action_id: "today_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "Describe your plan for today...",
            },
          },
        },
        {
          type: "input",
          block_id: "blockers",
          label: { type: "plain_text", text: "Any blockers?" },
          optional: true,
          element: {
            type: "plain_text_input",
            action_id: "blockers_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "Describe any blockers or issues...",
            },
          },
        },
      ],
    },
  });
}
