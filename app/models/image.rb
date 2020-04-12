class Image < ActiveRecord::Base
	belongs_to :section
	
  has_one_attached :image

end
