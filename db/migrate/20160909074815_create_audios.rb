class CreateAudios < ActiveRecord::Migration
  def change
    create_table :audios do |t|
      t.string :title
      t.text :description
      t.timestamps null: false
    end
  end
end
