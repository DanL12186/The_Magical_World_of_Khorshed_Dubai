class ApplicationController < ActionController::Base

  def home
    @book = Book.find_by(name: "Sandy Bottom")
  end
  
end
