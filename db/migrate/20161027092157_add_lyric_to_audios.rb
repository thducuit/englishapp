class AddLyricToAudios < ActiveRecord::Migration
  def change
    add_column :audios, :lyric, :text, :limit => 4294967295
  end
end
