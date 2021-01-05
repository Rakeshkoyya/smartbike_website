from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):
    def create_user(self, uniqueID, password=None):
        if not uniqueID:
            raise ValueError('Users must have an uniqueID')
        # if not username:
        # 	raise ValueError('Users must have a username')

        user = self.model(
            # email=self.normalize_email(email),
            uniqueID=uniqueID,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, uniqueID, password):
        user = self.create_user(
            # email=self.normalize_email(email),
            password=password,
            uniqueID=uniqueID,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return


class Account(AbstractBaseUser):
    # my fields
    uniqueID = models.CharField(max_length=10, unique=True)
    phone_number = models.CharField(max_length=15, default='0000')
    vechile_number = models.CharField(max_length=15, default='----')
    address = models.TextField(max_length=100, default='----')

    # django fileds
    email = models.EmailField(verbose_name="email", max_length=60)
    username = models.CharField(max_length=30)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'uniqueID'
    REQUIRED_FIELDS = []

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    # For checking permissions. to keep it simple all admin have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
        return True
