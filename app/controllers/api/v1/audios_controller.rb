class Api::V1::AudiosController < ApplicationController
    respond_to :json
    
    def index
        respond_with :api, :v1, Audio.all
    end
    
    def create
        @audio = Audio.new(audio_params)
        if audio.save
            respond_with :api, :v1, @audio
        end
    end
    
    private
    def audio_params
        params.require(:audio).permit(:title, :description)
    end
end
