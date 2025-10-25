Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/ubuntu2004"
  config.vm.hostname = "ansible-vm"
  config.vm.network "private_network", ip: "192.168.56.10"

  # sync project folder to /vagrant inside VM
  config.vm.synced_folder ".", "/vagrant"

  # lightweight shell provisioner to ensure python exists for Ansible if needed
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update -y
    sudo apt-get install -y python3 python3-pip
  SHELL

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "3072"
    vb.cpus = 2
  end
end
