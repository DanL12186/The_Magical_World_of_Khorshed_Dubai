class ApplicationController < ActionController::Base

  def home
    @top_book = Book.find_by(name: "Sir Joe's Quest")
    @second_book = Book.find_by(name: "Miss Dolphin's Class")
  end
  
end
