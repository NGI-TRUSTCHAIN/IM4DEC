module IntermediaryHelper
    def doorkeeper_org
        return Doorkeeper::Application.find(doorkeeper_token.application_id).organization_id.to_s
    end

    def doorkeeper_scope
       return doorkeeper_token.scopes.to_s
    end

    def doorkeeper_user
        id = nil
        @oauth = Doorkeeper::Application.find(doorkeeper_token.application_id)
        org_id = @oauth.organization_id
        user_name = @oauth.name
        Store.where(key: "user_" + org_id.to_s).each do |user|
            un = JSON.parse(user.item)["name"].to_s rescue ""
            del = JSON.parse(user.meta)["delete"].to_s.downcase rescue ""
            if un == user_name && del != "true"
                id = user.id
            end
        end
        return id
    end

end
