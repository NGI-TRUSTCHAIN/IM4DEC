FROM oydeu/dc-base
MAINTAINER "Christoph Fabianek" christoph@ownyourdata.eu

RUN apt-get update && \
	apt-get install -y \
		cron \
		curl \
		redis-tools && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY Gemfile.extend $WORKDIR
RUN bundle install && bundle update
COPY . .

CMD ["./script/redis.sh"]

EXPOSE 3000
