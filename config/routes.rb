Rails.application.routes.draw do
	

	root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :sections
  end

  devise_for :users, controllers: {
        registrations: 'users/registrations',
        sessions: 'users/sessions'
  }
  
  get '*unmatched_route', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
