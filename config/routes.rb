Rails.application.routes.draw do
	
	root to: 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :section do
      resources :images
      resources :texts
    end
  end

  devise_for :users, controllers: {
        registrations: 'registrations',
        session: 'sessions',
  }

  # get '*unmatched_route', to: 'home#index'
  
  get '/login', to: 'home#index'
  get '/settings', to: 'home#index'
  get '/contact', to: 'home#index'
  get '/about', to: 'home#index'

  
end
