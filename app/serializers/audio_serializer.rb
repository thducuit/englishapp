class AudioSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :url, :lyric
  
  def url
    object.file.url
  end    
end
