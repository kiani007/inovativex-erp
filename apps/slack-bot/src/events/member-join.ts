import type { App } from "@slack/bolt";

export function registerMemberJoinEvent(app: App) {
  app.event("team_join", async ({ event, client }) => {
    // Welcome new team members and guide them through onboarding
    try {
      await client.chat.postMessage({
        channel: event.user.id,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Welcome to Inovativex!",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: [
                "We're excited to have you on the team! Here are some things to get started:",
                "",
                "1. *Set up your ERP profile:* <https://erp.inovativex.com|Login to ERP>",
                "2. *Check your onboarding tasks:* Your manager has set up a checklist for you",
                "3. *Explore Slack commands:* Type `/erp help` to see what you can do from Slack",
                "",
                "*Key channels to join:*",
                "- #general — Company updates and announcements",
                "- #engineering — Technical discussions (if applicable)",
                "- #random — Water cooler chat",
                "- #standup — Daily standup posts",
                "",
                "If you need any help, reach out to your manager or the HR team!",
              ].join("\n"),
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "View Onboarding Checklist" },
                style: "primary",
                url: "https://erp.inovativex.com/onboarding",
              },
              {
                type: "button",
                text: { type: "plain_text", text: "Employee Directory" },
                url: "https://erp.inovativex.com/directory",
              },
            ],
          },
        ],
      });

      // Also post to #general
      await client.chat.postMessage({
        channel: "#general",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Please welcome <@${event.user.id}> to the Inovativex team! Say hello!`,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error welcoming new member:", error);
    }
  });
}
