class Api::TextsController < ApplicationController

	before_action :find_section

  def index
  	render json: @section.texts
  end

  def create
  	@text  = @section.texts.new(text_params)
    if @text.save
      render json: @text
    else
      render json: { errors: @text.errors, status: :unprocessable_entity }
    end
  end

  def show
    @text = Text.find(params[:id])
  end

  def update
  	@text = Text.find(params[:id])
    if @text.update(text_params)
      render json: @text
    else
       render json: { errors: @text.errors, status: :unprocessable_entity }
    end
  end

  def destroy
  	@section.texts.find(params[:id]).destroy
    render json: { message: 'item deleted' }
  end

  private

    def find_section
       @section = Section.find(params[:section_id])
    end

    def text_params
      params.require(:text).permit(:title, :kind, :content)
    end
end
