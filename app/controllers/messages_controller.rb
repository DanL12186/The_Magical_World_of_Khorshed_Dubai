class MessagesController < ApplicationController
  
  def new
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    if @message.valid?
      MessageMailer.contact(@message).deliver_now
      flash[:notice] = "We have received your message and will be in touch soon!"
      redirect_to root_path
    else
      flash[:notice] = "There was an error sending your message. Please try again."
      redirect_to messages_path
    end
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :phone_number, :subject, :body)
  end

end