class IntegrationsController < ApplicationController
    include ApplicationHelper
    include IntermediaryHelper

    before_action -> { doorkeeper_authorize! :read, :write, :admin }

    def match_da
        render json: {"match": true},
               status: 200
    end

end
