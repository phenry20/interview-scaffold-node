# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"

  config.vm.provider "virtualbox" do |vb|
      vb.memory = "500"
  end

  config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 5432, host: 5432, host_ip: "127.0.0.1"
  config.vm.network "private_network", ip: "192.168.50.50"

  config.vm.provision "docker" do |d|
      d.run "postgres",
        image: "postgres",
        args: "-p 5432:5432 -e POSTGRES_PASSWORD=devpass -e POSTGRES_USER=superuser -e POSTGRES_DB=postgres",
        cmd:  "postgres -c log_statement=all -c log_destination=stderr"
  end
end
