class Audio < ActiveRecord::Base
    
    has_attached_file :file, :validate_media_type => false , 
                      :url  => "/assets/audios/:id/:style/:basename.:extension",
                      :path => ":rails_root/public/assets/audios/:id/:style/:basename.:extension"
    
    
    validates_attachment_content_type :file,  content_type: /\Aaudio\/.*\Z/
    
    serialize :lyric
end
