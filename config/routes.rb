Rails.application.routes.draw do
	
	root to: 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :section do
      resources :images
    end
  end

  devise_for :users, controllers: {
        registrations: 'users/registrations',
        session: 'users/sessions',
  }
  
  # get '*unmatched_route', to: 'home#index'
  
end
