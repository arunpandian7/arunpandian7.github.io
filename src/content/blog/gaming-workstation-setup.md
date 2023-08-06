---
title: "Gaming and Workstation in One: Dual Boot"
description: "Guide to configure Dual Boot Windows and Ubuntu in a single workbook."
pubDate: "Dec 26 2020"
heroImage: "/gaming-setup-blog.webp"
prev: dummy-copy
---

As a gamer, we are obliged to use Windows. But as a developer, we often find ourselves limited by the tools available for windows and annoyed by some unstable environment especially if you develop ML application. I often frustrated getting an deployment bugs due to environment differences between local and cloud platform. I am sure you can find a lot of reasons for why you should use Linux for some development process.

I tried WSL2 running Ubuntu 20.04 LTS for a brief time of 2 weeks. I’m not gonna lie, WSL2 is great and I would give Microsoft for making it seamless. But there are still few things which require attention and some bugs are still under review for a long time now. Yeah obviously you are going to get a lot of troubles when dealing with the tool and framework which are already troublesome maintenance. I use GPU to train my Machine Learning models but the support for CUDA in windows is still in its early stages. Overall, WSL has got a long way to go before becoming an ultimate environment for Development. I am sure Microsoft may achieve it one day.

So what’s the solution, we are obviously turning back to the good old Dual Boot. It is best for laptops, as linux tends to drink less battery, you will have a epic workstation with good enough battery life. It will give the best of both worlds and also make you productive as you isolating the two different environments, Developing and Gaming into their respective Operating System. Let’s get started

### Plan your partitions

For this setup, I will assume the hard drive size to be 500 GB. We should part the drive balanced way, which there is sufficient space for big games and accommodate enough files for development. I will advice you to have separate partition for your local development repositories and your assets with 50–75 GB. Windows OS takes a big chunk of our drive so does it’s application and huge game files will swallow a huge space in later days. So it is better to have OS, Windows App and Games installed in one partition (Default C:), give it around 350 GB for the game installations. Finally you will left with 50–75 GB for Linux installation which is more than enough for Linux.

    .--------.----------.------------------------.
    | Drive  |   Size   |        Purpose         |
    :--------+----------+------------------------:
    | C:     | 350 GB   | Windows, Game Installs |
    :--------+----------+------------------------:
    | D:     | 50-75 GB | Development Home       |
    :--------+----------+------------------------:
    | Root   | 50-75 GB | Linux Root             |
    '--------'----------'------------------------'

Your Development Home Drive Partition will be accessible by both Windows and Linux that it will be harmonic for you to switch OS and can view your repositories. Now we shall partitions using Drive Manager in Windows. Remember to format and allocate only the “Dev Home” as D:\ Drive and leave Linux Drive Partition as un-allocated.

### Installing Pop OS 20

For this guide, I am going to be using Pop OS 20. You can use any other Ubuntu based Linux Distros. If you are new to linux, I would strongly recommend you Pop OS. I got a nvidia dedicated graphics card, Pop OS natively supports nvidia graphics with bundled nvidia drivers. It will be a hassle free installation. You can download Pop OS ISO bundled with nvidia drivers [here](https://pop.system76.com/)

After downloading ISO file, use [Etcher.io](https://etcher.io/) to create a bootable USB drive. You can find an intuitive guide on Etcher.io on how to do that correctly.

Now that you got Pop OS on a bootable drive. You can now reboot your machine and press the respective key to open Boot Menu at the startup. You can find your machine’s Boot Menu Key with a simple Google Search. Now select the USB Drive from boot menu. You will be greeted with Pop OS Greeter, choose “Try or Install Pop OS” and press Enter. Now you will run a live version of Pop OS.

![Pop OS USB Live](https://cdn-images-1.medium.com/max/2720/0*AnSC1viNsTaxPtzF.png)*Pop OS USB Live*

Get through the setup process by selecting your region, language and keyboard layout. Then you will be prompted to choose an installation medium, where and how would you like to install Pop OS. For this choose **Custom(Advanced)** to perform Dual Boot settings and not messing up Windows Partitions.

![](https://cdn-images-1.medium.com/max/2728/0*cs6mkWSnrLF_aX-R.png)

Now you will see the partition table of our hard drive. You can see our windows partition, Dev Home partition and our un-allocated partition that we had reserved for Pop OS. Use GParted tool available right below to create three new partition according to the specs given below.

    .--------------.----------.-------------.----------.
    | Name / Label |   Size   | File System |  Use as  |
    :--------------+----------+-------------+----------:
    | EFI          | 500 MiB  | fat32       | Boot     |
    :--------------+----------+-------------+----------:
    | PopOS        | 50-70GB  | ext4        | Root (/) |
    :--------------+----------+-------------+----------:
    | Swap         | Optional | linux-swap  | Swap     |
    '--------------'----------'-------------'----------'

I would recommend you to have 2GB Swap Memory just in case for later use. Now that these partitions are created, select these newly created partitions for it’s respective use in the Partition Table Screen that you seen before. Press **Erase and Install**. The Pop OS installer will wipe these partitions, extract its files and install in these partitions. It will take a couple of minutes to install. Once that’s over, reboot the machine and boot into Pop OS by using Boot menu. (Note: Since Window’s is still default in the boot sequence, you will have to select Pop OS from Boot Menu to boot into that)

You will be expected to finalize the installation process by selecting few more initial settings and enjoy your Pop OS installed and running. But there still more things to do before leaving up to use it as daily driver. Pop OS doesn’t come with **GRUB Bootloader**, which will help us select between two operating system and offer few customization.

### Installing GRUB Bootloader

Make sure your machine is up to date and have latest packages with this command. This will install few of pending updates if there any.

    sudo apt update -y && sudo apt upgrade -y

Now install GRUB and GRUB Customizer app using,

    sudo apt install grub-efi grub2-common grub-customizer

After the packages installed without any error. Go on to run GRUB-Install to install GRUB as Bootloader.

    sudo grub-install

Because there will be bad install of grub by the kernel. We will have to manually copy grub.efi to its appropriate folder and overwrite, run

    sudo cp /boot/grub/x86_64-efi/grub.efi /boot/efi/EFI/pop/grubx64.efi

Now the GRUB file have nothing in it and we have to set it up from GRUB-Customizer. Open Grub Customizer App from the applications.

* Click on Change Environment

* In the Environment Setup Screen, set OUTPUT_FILE value to /boot/efi/EFI/pop/grub.cfg

* Save the configuration using **Save**

* Click **Apply**

* Reboot your system to GRUB Bootloader giving you choice between Pop OS and Windows

Now you can easily switch between Pop OS and Windows.

### Auto-mounting Drives

Although you can mount and explore the files in Windows Partition Drives with **Files**application in Pop OS. You have to mount every time you boot Pop OS. You can automate this process by configuring in **fstab** configuration file.

* Open *Disks* from applications and activities

* Find your **Dev Home**partition that you created back in windows with NTFS format

![Disks Application](https://cdn-images-1.medium.com/max/2000/1*6gD73xWDrMRuBHS3UTVahA.png)*Disks Application*

* After selecting your partition, you can see some info down there where you can find **UUID.**Copy that in your clipboard

* Open fstab file in an text editor with root access

```bash
   sudo nano /etc/fstab`
```

* Add the following new line after the end of the file in this specified format.

```
    UUID=<UUID of the partition> /media/<name> ntfs-3g auto,user,rw 0 0
```
![fstab Configuration File](https://cdn-images-1.medium.com/max/2010/1*oUvpf_jlzIv7tCGNLhG9IA.png)*fstab Configuration File*
> Note : You have to use Tab to separate them out instead of space.

    cd /media/home

You can now use drive for all your local development which you can access both from Windows and Linux. You can set an alias in your .bashrc file or set your shell’s start directory as /media/home by adding the above command at the end of the .bashrc file.

### And they live in harmony ever after…

Both Windows and Linux are blissful for developers at times you will need both systems for you to work. Dual Boost maybe tiresome at times but it is the closest thing for an perfect development workstation which you can use for gaming. Having an common shared partition truly takes your freedom to heights as you can enjoy both environment’s love.

### References

1. [Pop OS on Asus Zephyrus G14](https://abskmj.github.io/notes/posts/rog-zephyrus-g14/popos/)

2. [Pop OS 20.04 LTS Installation Guide](https://linoxide.com/distros/install-pop-os-20-04/)

3. [Install GRUB on Pop OS](https://jacci.net/linux/pop-os/how-to-install-grub-on-pop-os-20-04/)
