FROM oydeu/dc-base
LABEL org.opencontainers.image.authors="Christoph Fabianek <christoph@ownyourdata.eu>"

RUN apt-get update && \
	apt-get install -y \
		curl  && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
	gem install websocket
COPY Gemfile.extend .
RUN bundle install && bundle update

COPY . .

CMD ["./script/chat.sh"]

EXPOSE 3000
