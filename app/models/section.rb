class Section < ApplicationRecord

	validates_presence_of :title
	#has_many :texts , dependent: :destroy
	has_many :images, dependent: :destroy
	#has_many :dreamboards, dependent: :destroy
	
	def as_json(_opts = {})
	 {
	    id: id,
	    title: title,
	    color: color,
	    collapse: collapse,
	    kind: kind,
	    errors: errors
	  }
	 end

end
