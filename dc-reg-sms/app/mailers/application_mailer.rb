class ApplicationMailer < ActionMailer::Base
  default from: ENV["FROM_MAIL"] || 'DEC112 IoT <info@dec112.at>'
  layout 'mailer'
end
