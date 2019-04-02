class ApplicationController < ActionController::Base

  def home
    @book = Book.last
  end

  # def send_simple_message
  #   RestClient.post "https://api.mailgun.net/v3/sandboxe2851e4f2a6046c7a8bb9702017d8211.mailgun.org",
  #   :from => "Dommycakes <sandboxe2851e4f2a6046c7a8bb9702017d8211.mailgun.org>",
  #   :to => "bar@example.com, daniel.lempesis@gmail.com",
  #   :subject => "Hello",
  #   :text => "Testing some Mailgun awesomness!"
  # end
  
end
