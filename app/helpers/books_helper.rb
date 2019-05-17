module BooksHelper
  
  def page_size(format)
    format == 'double' ? '495x380' : '760x990'
  end

end
