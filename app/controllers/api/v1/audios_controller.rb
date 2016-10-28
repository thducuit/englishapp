class Api::V1::AudiosController < ApplicationController
    before_action :find_audio, only: [:show, :update, :destroy]
    
    def index
        render json: Audio.all
    end
    
    def show
        render json: @audio
    end
    
    def create
        @audio = Audio.new(audio_params)
        if @audio.save
            render json: {:status => :created, :data => @audio }, status: :created
        else
            render json: {:status =>:unprocessable_entity, :data => @audio.errors}, status: :unprocessable_entity
        end
    end
    
    def update
        if @audio.update(audio_params)
            render json: @audio
        else
            render json: @audio.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        if @audio.destroy
            render json: {:status => :ok}, status: :ok
        else
            render json: @audio.errors, status: :unprocessable_entity
        end
    end
    
    private
    def find_audio
        @audio = Audio.find(params[:id])
    end
    def audio_params
        params.require(:audio).permit(:title, :description, :file)
    end
end
