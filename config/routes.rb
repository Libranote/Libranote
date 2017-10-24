Rails.application.routes.draw do
  namespace :api do
    resources :school
  end

  get '/*any', to: 'home#index', as: :web
  root 'home#index'
end
