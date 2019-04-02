class MessageMailer < ApplicationMailer
  require 'mailgun'
  
  def contact(message)
    @body = message.body
    mg_client = Mailgun::Client.new(ENV['MAIL_GUN_API_KEY'])
    message_params = { from: message.email,
                        to: ENV['EMAIL'],
                        subject: 'Your Website',
                        text: message.body
                      }

    mg_client.send_message(ENV['MAILGUN_DOMAIN'], message_params)
  end

end