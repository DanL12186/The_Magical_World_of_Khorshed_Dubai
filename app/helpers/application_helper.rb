module ApplicationHelper
  def title(page_name)
    content_for(:title) { page_name }
  end

  def to_folder_name(name)
    name.downcase.split.join('_')
  end
end
