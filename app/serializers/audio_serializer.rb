class AudioSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :url
  
  def url
    object.file.url
  end    
end
