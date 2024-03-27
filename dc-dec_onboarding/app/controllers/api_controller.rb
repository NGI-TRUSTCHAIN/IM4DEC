class ApiController < ApplicationController
	protect_from_forgery with: :null_session,
      if: Proc.new { |c| c.request.format =~ %r{application/json} }
	
	if !(ENV["AUTH"].to_s == "" || ENV["AUTH"].to_s.downcase == "false")
		before_action -> { doorkeeper_authorize! :read, :write, :admin }
	end
end