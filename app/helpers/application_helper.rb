module ApplicationHelper
  def title(page_name)
    content_for(:title) { page_name }
  end

  def to_file_name(name)
    name.downcase.split.join('_').delete('?')
  end

  #gets the fingerprinted file for a given input (e.g. "Sir Joe's Quest/webp/page-6.webp" -> "sir_joe's_quest/webp/page-6-f98dsf87689wef8w9q87623g.webp")
  def get_fingerprint(input_str)
    file_name = to_file_name(input_str)
    asset_digest_path(file_name)
  end

  #this maintains fingerprinting for jpeg and webp image placeholders.
  #accounts for both numbered pages generated inside loop, and explicitly-named pages (page-6.jpg vs. cover.jpg)
  def fingerprinted_dual_format_lazy_image(book_name, page)
    page = "page-#{page}" if page.is_a?(Integer)

    jpg         = get_fingerprint("#{book_name}/jpg/#{page}.jpg")
    webp        = get_fingerprint("#{book_name}/webp/#{page}.webp")
    image_class = "page lazy #{book_name.downcase}"
    
    image_tag(
      src  = '', 
      options = {
        webp_src: webp, 
        jpg_src: jpg,
        class: image_class
      }
    )
  end

  #page-static-img-js are the issues
  def fingerprinted_dual_format_static_image(book_name, id = '', klass = 'img-fluid static-img static-img-js')
    jpg  = get_fingerprint("#{book_name}/jpg/cover.jpg")
    webp = get_fingerprint("#{book_name}/webp/cover.webp")
    
    image_tag(
      src = "/assets/#{webp}",
      options = {
        jpg_src: "/assets/#{jpg}",
        class: klass,
        alt: book_name,
        id: id
      }
    )
  end

end
