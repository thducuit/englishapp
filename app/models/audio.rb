class Audio < ActiveRecord::Base
    
    has_attached_file :file, { validate_media_type: false }
    
    validates_attachment_content_type :file,  content_type: /\Aaudio\/.*\Z/
    
end
