class AddLyricToAudios < ActiveRecord::Migration
  def change
    add_column :audios, :lyric, :text, :limit => 1073741823
                                                 
  end
end
