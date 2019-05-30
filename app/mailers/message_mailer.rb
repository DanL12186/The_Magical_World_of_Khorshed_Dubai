class MessageMailer < ApplicationMailer
  require 'mailgun'
  
  def contact(message)
    subject = message.subject unless message.subject.strip.empty?
    mg_client = Mailgun::Client.new(ENV['MAILGUN_API_KEY'])
    
    message_params = {  
                        from: "#{message.name} <#{message.email}>",
                        to: ENV['EMAIL'],
                        subject: subject || 'Dubash Designs',
                        text: message.body
                      }

    mg_client.send_message(ENV['MAILGUN_DOMAIN'], message_params)
  end

end