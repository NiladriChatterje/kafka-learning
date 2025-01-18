# Basic Idea
-     Initial setup: docker container of apache/kafka for brokers to be running
-     setup kafka-topics for producing and consuming through interactive session inside container

# What I did.
created two consumers of same consumer group and produced messages to different partitions through randomized selection and waited for the messages to be consumed in different sessions.
(NOTE: there is 3 partitions created during topic creation through kafka-topics.sh)
