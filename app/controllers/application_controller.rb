class ApplicationController < ActionController::Base

  def home
    @top_book, @second_book, @third_book = Book.all
    @message = Message.new
  end
  
end
