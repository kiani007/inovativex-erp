import type { SlackCommandContext } from "../types";

export async function registerEmployeeCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "whoami":
      return await handleWhoAmI(context);
    case "directory":
      return await handleDirectory(context);
    case "profile":
      return await handleProfile(context);
    case "org-chart":
      return await handleOrgChart(context);
    case "openings":
      return await handleOpenings(context);
    case "referral":
      return await handleReferral(context);
    default:
      return await handleWhoAmI(context);
  }
}

async function handleWhoAmI(context: SlackCommandContext) {
  // In production, look up user profile from Supabase
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Your Profile*",
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Name:* Sarah Chen" },
          { type: "mrkdwn", text: "*ID:* INX-001" },
          { type: "mrkdwn", text: "*Role:* Senior Software Engineer" },
          { type: "mrkdwn", text: "*Department:* Engineering" },
          { type: "mrkdwn", text: "*Manager:* Alex Thompson" },
          { type: "mrkdwn", text: "*Joined:* Jan 15, 2023" },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "View Full Profile" },
            url: "https://erp.inovativex.com/employees/1",
          },
        ],
      },
    ],
  });
}

async function handleDirectory(context: SlackCommandContext) {
  const searchTerm = context.args.join(" ");

  await context.respond({
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: searchTerm
            ? `Search Results: "${searchTerm}"`
            : "Employee Directory",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "*Engineering (48)*",
            "- Sarah Chen — Senior Software Engineer",
            "- James Wilson — DevOps Lead",
            "- Elena Rodriguez — QA Engineer",
            "",
            "*Product (8)*",
            "- Ahmed Khan — Product Manager",
            "",
            "*Design (12)*",
            "- David Kim — UI/UX Designer",
          ].join("\n"),
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "View Full Directory" },
            url: "https://erp.inovativex.com/directory",
          },
        ],
      },
    ],
  });
}

async function handleProfile(context: SlackCommandContext) {
  const userMention = context.args[0] || "";

  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Employee Profile: ${userMention || "Sarah Chen"}*`,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Department:* Engineering" },
          { type: "mrkdwn", text: "*Role:* Senior Software Engineer" },
          { type: "mrkdwn", text: "*Manager:* Alex Thompson" },
          { type: "mrkdwn", text: "*Status:* Active" },
        ],
      },
    ],
  });
}

async function handleOrgChart(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "View the organization chart:\n<https://erp.inovativex.com/org-chart|Open Org Chart>",
        },
      },
    ],
  });
}

async function handleOpenings(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Open Positions" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "1. *Senior React Developer* — Engineering (Remote)",
            "   12 applicants | Posted 5 days ago",
            "",
            "2. *DevOps Engineer* — DevOps (Hybrid)",
            "   8 applicants | Posted 1 week ago",
            "",
            "3. *Product Designer* — Design (Office)",
            "   15 applicants | Posted 2 weeks ago",
            "",
            "4. *QA Automation Engineer* — QA (Remote)",
            "   6 applicants | Posted 3 days ago",
          ].join("\n"),
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Submit a Referral" },
            style: "primary",
            action_id: "submit_referral_btn",
          },
          {
            type: "button",
            text: { type: "plain_text", text: "View All Openings" },
            url: "https://erp.inovativex.com/recruitment/jobs",
          },
        ],
      },
    ],
  });
}

async function handleReferral(context: SlackCommandContext) {
  await context.client.views.open({
    trigger_id: (context.body as { trigger_id: string }).trigger_id,
    view: {
      type: "modal",
      callback_id: "referral_submit_modal",
      title: { type: "plain_text", text: "Submit Referral" },
      submit: { type: "plain_text", text: "Submit" },
      close: { type: "plain_text", text: "Cancel" },
      blocks: [
        {
          type: "input",
          block_id: "candidate_name",
          label: { type: "plain_text", text: "Candidate Name" },
          element: {
            type: "plain_text_input",
            action_id: "name_input",
          },
        },
        {
          type: "input",
          block_id: "candidate_email",
          label: { type: "plain_text", text: "Candidate Email" },
          element: {
            type: "email_text_input",
            action_id: "email_input",
          },
        },
        {
          type: "input",
          block_id: "job_position",
          label: { type: "plain_text", text: "Position" },
          element: {
            type: "static_select",
            action_id: "position_select",
            options: [
              { text: { type: "plain_text", text: "Senior React Developer" }, value: "react-dev" },
              { text: { type: "plain_text", text: "DevOps Engineer" }, value: "devops" },
              { text: { type: "plain_text", text: "Product Designer" }, value: "designer" },
              { text: { type: "plain_text", text: "QA Automation Engineer" }, value: "qa" },
            ],
          },
        },
        {
          type: "input",
          block_id: "notes",
          label: { type: "plain_text", text: "Notes (optional)" },
          optional: true,
          element: {
            type: "plain_text_input",
            action_id: "notes_input",
            multiline: true,
          },
        },
      ],
    },
  });
}
