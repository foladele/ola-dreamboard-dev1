
class UpdateImageService

	def initialize(image, params)
    @image = image
    @params = params
  end

  def call
    if @params[:image] && !file?(@params[:image])
      delete_image if @image.image.attached?
      @params.delete(:image)
    end

    @image.update(@params)
  end

  def file?(param)
    param.is_a?(ActionDispatch::Http::UploadedFile)
  end

  def delete_image
    @image.image.purge
  end

end