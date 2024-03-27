module CalltypeHelper
    def map_uri_calltype(uri)
        call_type = ""
        case uri.to_s
        when "122"
            call_type="fire"
        when "133"
            call_type="police"
        when "144"
            call_type="ambulance"
        end
        return call_type # string police|fire|health based on msg input; empty if calltpye can't be identified
     end

end