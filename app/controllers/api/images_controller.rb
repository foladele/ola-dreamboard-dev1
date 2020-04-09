require 'pry'
class Api::ImagesController < ApplicationController

	before_action :find_section
  
  def index
    # binding.pry
    render json: @section.images #.all.with_attached_image
  end

  def create
    @image  = @section.images.new(image_params)
    if @image.save
      render json: @image
    else
      render json: { errors: @image.errors, status: :unprocessable_entity }
    end
  end

  def update
    @image = Image.find(params[:id])
    if @image.update(image_params)
    # if UpdateImageService(@image, image_params).call
      render json: @image
    else
       render json: { errors: @image.errors, status: :unprocessable_entity }
    end
  end

  def destroy    
    @section.images.find(params[:id]).destroy
    render json: { message: 'item deleted' }
  end

  private

    def find_section
        @section = Section.find(params[:section_id])
    end

    def image_params
      params.require(:image).permit(:title, :kind, :description, :image)
    end
end
