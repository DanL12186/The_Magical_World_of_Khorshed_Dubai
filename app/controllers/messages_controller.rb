class MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)
    if @message.valid?
      MessageMailer.contact(@message).deliver_later
      flash[:notice] = "We have received your message and will be in touch soon!"
    else
      flash[:notice] = "There was an error sending your message. Please try again."
    end
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :phone_number, :subject, :body)
  end

end