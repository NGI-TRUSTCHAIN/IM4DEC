class EventMailer < ApplicationMailer
    include ApplicationHelper

    def send_email(to, subject, body)
        mail(to: to,
             subject: subject,
             body: body,
             content_type: "text/html")
    end
end
