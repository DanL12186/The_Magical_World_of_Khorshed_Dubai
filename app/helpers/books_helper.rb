module BooksHelper
  def page_size(format)
    format == 'double' ? '495x380' : '760x990'
  end

  def folder_name(book_name)
    book_name.downcase.split.join('_')
  end
end
