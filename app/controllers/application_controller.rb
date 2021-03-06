class ApplicationController < ActionController::Base
	respond_to :json
	protect_from_forgery with: :null_session

	before_action :configure_sign_up_params, if: :devise_controller?

  protected
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up,
                                        keys: [
                                          :email,
                                          :password,
                                          :password_confirmation,
                                        ]
      )
    end
	
end
