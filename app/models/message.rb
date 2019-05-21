class Message
  include ActiveModel::Model
  attr_accessor :name, :email, :phone_number, :body, :subject
  
  validates :name, :email, :body, presence: true
end