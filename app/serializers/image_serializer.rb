class ImageSerializer < ActiveModel::Serializer
	include Rails.application.routes.url_helpers

  attributes :id, :section_id, :title, :kind, :description, :image

  def image
    return unless object.image.attached?

    object.image.blob.attributes
          .slice('filename', 'byte_size')
          .merge(url: image_url)
          .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end

  def image_url
    url_for(object.image)
    # rails_blob_path(object.image, disposition: "attachment", only_path: true)
  end

end
