"""empty message

Revision ID: 8f2e1b257e00
Revises: 
Create Date: 2024-08-10 12:35:09.405679

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f2e1b257e00'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('car',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('street_name', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=80), nullable=True),
    sa.Column('state', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('country', sa.String(length=80), nullable=True),
    sa.Column('zip_code', sa.String(length=20), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('is_for_sale', sa.Boolean(), nullable=True),
    sa.Column('is_new', sa.Boolean(), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('currency', sa.String(length=10), nullable=True),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.Column('make', sa.String(length=80), nullable=True),
    sa.Column('sit_size', sa.Integer(), nullable=True),
    sa.Column('model', sa.String(length=80), nullable=True),
    sa.Column('mileage', sa.Float(), nullable=True),
    sa.Column('miles_per_hour', sa.Float(), nullable=True),
    sa.Column('engine_type', sa.String(length=80), nullable=True),
    sa.Column('transmission', sa.String(length=80), nullable=True),
    sa.Column('color', sa.String(length=80), nullable=True),
    sa.Column('fuel_type', sa.String(length=80), nullable=True),
    sa.Column('condition', sa.String(length=80), nullable=True),
    sa.Column('body_style', sa.String(length=80), nullable=True),
    sa.Column('acceleration', sa.Float(), nullable=True),
    sa.Column('horse_power', sa.Float(), nullable=True),
    sa.Column('torque', sa.Float(), nullable=True),
    sa.Column('interior_color', sa.String(length=80), nullable=True),
    sa.Column('top_speed', sa.Float(), nullable=True),
    sa.Column('has_sunroof', sa.Boolean(), nullable=True),
    sa.Column('has_navigation_system', sa.Boolean(), nullable=True),
    sa.Column('has_bluetooth', sa.Boolean(), nullable=True),
    sa.Column('has_audio_system', sa.Boolean(), nullable=True),
    sa.Column('number_of_airbags', sa.Integer(), nullable=True),
    sa.Column('number_of_doors', sa.Integer(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('car')
    op.drop_table('user')
    # ### end Alembic commands ###
